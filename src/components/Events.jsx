import { useState } from "react";
import NavBar from "./Navbar";

const tabs = [
  { key: "upcoming", label: "Upcoming Events" },
  { key: "past", label: "Past Events" },
];

const Card = ({
  title,
  desc,
  date,
  time,
  venue,
  cta,
  ctaHref,
  image,
  muted,
}) => {
  return (
    <div className="rounded-xl bg-blue-100 p-6 text-neutral-900 shadow-sm ring-1 ring-white/30">
      <div className="mb-6 flex items-center justify-center overflow-hidden rounded-lg bg-blue-75">
        {image ? (
          <img src={image} alt={title} className="h-56 w-full object-cover" />
        ) : (
          <div className="flex h-56 w-full items-center justify-center text-2xl font-zentry text-neutral-700">
            {muted ? "EVENT" : "UPCOMING EVENTS"}
          </div>
        )}
      </div>

      <h3 className="font-zentry text-2xl font-black">{title}</h3>
      <p className="mt-2 text-neutral-700">{desc}</p>

      <div className="mt-6 space-y-2 text-sm">
        {date && (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-300" />
            <span>{date}</span>
          </div>
        )}
        {time && (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-300" />
            <span>{time}</span>
          </div>
        )}
        {venue && (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neutral-800" />
            <span>{venue}</span>
          </div>
        )}
      </div>

      <button
        disabled={!cta}
        onClick={() => {
          if (cta && ctaHref) window.location.href = ctaHref;
        }}
        className="mt-6 w-full rounded-full bg-yellow-300 px-6 py-3 font-general text-xs uppercase text-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        {cta || "Opening Soon"}
      </button>
    </div>
  );
};

const Events = () => {
  const [active, setActive] = useState("upcoming");

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />

      <section className="mx-auto mt-28 max-w-6xl px-5 sm:px-10">
        <div className="flex gap-3">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`rounded-full px-5 py-2 text-sm font-general uppercase ring-1 ring-neutral-800/20 ${
                active === t.key
                  ? "bg-violet-300 text-white"
                  : "bg-blue-50 text-neutral-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {active === "upcoming" ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card
              title="Nvidia AI Session"
              desc="Discover cutting-edge innovations and real-world case studies on how NVIDIA AI is driving breakthroughs across industries."
              date="26TH AUGUST, 2025"
              time="11:30 AM to 1:30 PM"
              venue="MAC LAB"
              cta="Register Now"
              ctaHref="https://google.com"
              image="/img/Nvidia-event.png"
            />

            <Card
              title="Upcoming Tech Workshop"
              desc="We're planning something amazing just for you."
              venue="JSPM Campus"
              image="/img/upcomingevent.jpg"
            />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* <Card
              title="Intro to AI at Gotham"
              desc="Kickoff session that started it all."
              date="12th October, 2024"
              time="10:00 AM"
              venue="Auditorium"
              cta={null}
              image="/img/gallery-3.webp"
              muted
            /> */}
            {/* <Card
              title="Designing with ML"
              desc="Hands-on demos and lightning talks."
              date="5th November, 2024"
              time="2:00 PM"
              venue="Lab 2"
              cta={null}
              image="/img/gallery-4.webp"
              muted
            /> */}
          </div>
        )}
      </section>
    </main>
  );
};

export default Events;
