package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"
)

type healthResponse struct {
	Status  string `json:"status"`
	Service string `json:"service"`
	Time    string `json:"time"`
}

type Car struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Tagline     string `json:"tagline"`
	Accent      string `json:"accent"`
	Personality string `json:"personality"`
}

type waitlistRequest struct {
	Email string `json:"email"`
}

type waitlistResponse struct {
	OK      bool   `json:"ok"`
	Message string `json:"message"`
}

var featuredCars = []Car{
	{
		ID:          "spark-01",
		Name:        "Spark",
		Tagline:     "Learns your favorite routes",
		Accent:      "#FF5A1F",
		Personality: "Curious sprinter that remembers every loop of the living-room track.",
	},
	{
		ID:          "volt-02",
		Name:        "Volt",
		Tagline:     "Races with you, not past you",
		Accent:      "#0A7EA4",
		Personality: "Competitive coach that dials difficulty to match young drivers.",
	},
	{
		ID:          "echo-03",
		Name:        "Echo",
		Tagline:     "Talks back with stories",
		Accent:      "#1FA971",
		Personality: "Storyteller on wheels — narrates adventures as you explore.",
	},
}

var (
	waitlistMu sync.Mutex
	waitlist   = make([]string, 0, 64)
)

func main() {
	addr := envOr("API_ADDR", ":8080")
	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", handleHealth)
	mux.HandleFunc("GET /api/cars/featured", handleFeaturedCars)
	mux.HandleFunc("POST /api/waitlist", handleWaitlist)

	handler := withCORS(mux)

	log.Printf("Mini Adventure API listening on %s", addr)
	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatal(err)
	}
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, healthResponse{
		Status:  "ok",
		Service: "mini-adventure-api",
		Time:    time.Now().UTC().Format(time.RFC3339),
	})
}

func handleFeaturedCars(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"cars": featuredCars,
	})
}

func handleWaitlist(w http.ResponseWriter, r *http.Request) {
	var req waitlistRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, waitlistResponse{
			OK:      false,
			Message: "Invalid JSON body.",
		})
		return
	}

	email := strings.TrimSpace(strings.ToLower(req.Email))
	if email == "" || !strings.Contains(email, "@") || !strings.Contains(email, ".") {
		writeJSON(w, http.StatusBadRequest, waitlistResponse{
			OK:      false,
			Message: "Please enter a valid email.",
		})
		return
	}

	waitlistMu.Lock()
	waitlist = append(waitlist, email)
	count := len(waitlist)
	waitlistMu.Unlock()

	log.Printf("waitlist signup #%d: %s", count, email)
	writeJSON(w, http.StatusCreated, waitlistResponse{
		OK:      true,
		Message: "You're on the list. We'll ping you when Spark rolls out.",
	})
}

func withCORS(next http.Handler) http.Handler {
	origins := envOr("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
	allowed := map[string]struct{}{}
	for _, o := range strings.Split(origins, ",") {
		o = strings.TrimSpace(o)
		if o != "" {
			allowed[o] = struct{}{}
		}
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if _, ok := allowed[origin]; ok {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		}

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
