import HeroCar from "@/components/HeroCar";
import WaitlistForm from "@/components/WaitlistForm";
import { fetchFeaturedCars } from "@/lib/api";
import styles from "./page.module.css";

export default async function Home() {
  let cars: Awaited<ReturnType<typeof fetchFeaturedCars>> = [];
  let carsError: string | null = null;

  try {
    cars = await fetchFeaturedCars();
  } catch {
    carsError =
      "Featured cars will appear once the API is running on port 8080.";
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden={false}>
          <HeroCar />
        </div>
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.brand}>Mini Adventure</p>
          <h1 className={styles.headline}>AI cars that race with you</h1>
          <p className={styles.lede}>
            Smart toy cars that learn the track, talk back, and grow with every
            lap.
          </p>
          <div className={styles.ctaGroup}>
            <a className={styles.ctaPrimary} href="#waitlist">
              Join the waitlist
            </a>
            <a className={styles.ctaSecondary} href="#cars">
              Explore the cars
            </a>
          </div>
        </div>
      </header>

      <section id="cars" className={styles.section} aria-labelledby="cars-title">
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>First lineup</p>
          <h2 id="cars-title" className={styles.sectionTitle}>
            Meet the cars
          </h2>
          <p className={styles.sectionLede}>
            Three personalities. One shared brain. Built for living-room races
            and collector shelves alike.
          </p>
        </div>

        {carsError ? (
          <p className={styles.carError}>{carsError}</p>
        ) : (
          <ul className={styles.carList}>
            {cars.map((car) => (
              <li
                key={car.id}
                className={styles.carItem}
                style={{ ["--car-accent" as string]: car.accent }}
              >
                <h3 className={styles.carName}>{car.name}</h3>
                <p className={styles.carTagline}>{car.tagline}</p>
                <p className={styles.carPersonality}>{car.personality}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        id="waitlist"
        className={styles.waitlistSection}
        aria-labelledby="waitlist-title"
      >
        <div className={styles.waitlistInner}>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow}>Early access</p>
            <h2 id="waitlist-title" className={styles.sectionTitle}>
              Be first when Spark rolls out
            </h2>
            <p className={styles.sectionLede}>
              One list. No spam. We&apos;ll tell you when preorders open.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerBrand}>Mini Adventure</span>
        <span>Play. Race. Learn.</span>
      </footer>
    </div>
  );
}
