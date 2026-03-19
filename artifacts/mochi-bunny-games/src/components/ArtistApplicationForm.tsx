import { useState } from "react";
import { Loader2 } from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyrbELQB4WZdQwGjwuz4_zEn0dh6Q4Jn8Qf24dDIuXrsMyHRhxyryjJopih5eFN2TYttQ/exec";

const STYLE_OPTIONS = [
  "Analog Horror",
  "Backrooms / Liminal",
  "Surveillance Horror",
  "Hyperreal Uncanny Humans",
  "Pixel Art",
  "Chibi / VN Portraits",
  "Low Poly",
  "Realistic Horror",
  "UI Design",
];

export default function ArtistApplicationForm() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    style: "",
    portfolio: "",
    why: "",
    availability: "",
    years: "",
    pricing: "",
    contact: "",
  });
  const [styles, setStyles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleStyle(value: string) {
    setStyles((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(false);

    const payload = {
      name: form.name,
      role: form.role,
      style: form.style,
      portfolio: form.portfolio,
      styles: styles.join(", "),
      why: form.why,
      availability: form.availability,
      years: form.years,
      pricing: form.pricing,
      contact: form.contact,
    };

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Submission failed with status ${res.status}.`);
      }

      const result = (await res.json()) as {
        success?: boolean;
        error?: string;
        row?: number;
      };

      if (!result.success) {
        throw new Error(result.error || "Submission was not saved.");
      }

      setSubmitted(true);
      setForm({
        name: "",
        role: "",
        style: "",
        portfolio: "",
        why: "",
        availability: "",
        years: "",
        pricing: "",
        contact: "",
      });
      setStyles([]);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "something went wrong sending your form.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border-4 border-pink-200 bg-white p-6 shadow-kawaii md:p-8">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-secondary/20 blur-2xl" />

      <div className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="artist-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="name / alias"
            autoComplete="name"
            required
            className="w-full rounded-xl border border-pink-200 bg-pink-50/70 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <select
              id="artist-role"
              name="role"
              value={form.role}
              onChange={handleChange}
              autoComplete="organization-title"
              required
              className="w-full rounded-xl border border-pink-200 bg-pink-50/70 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">select role</option>
              <option value="3D Environment Artist (Static Renders)">
                3D Environment Artist (Static Renders)
              </option>
              <option value="2D Avatar / Character Animator">
                2D Avatar / Character Animator
              </option>
              <option value="Hyperreal Character / Uncanny Human Artist">
                Hyperreal Character / Uncanny Human Artist
              </option>
            </select>

            <select
              id="artist-style"
              name="style"
              value={form.style}
              onChange={handleChange}
              autoComplete="off"
              className="w-full rounded-xl border border-pink-200 bg-pink-50/70 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">primary specialty</option>
              <option value="Static Horror Environments">Static Horror Environments</option>
              <option value="Surveillance / Security Camera Scenes">
                Surveillance / Security Camera Scenes
              </option>
              <option value="Liminal / Backrooms Spaces">Liminal / Backrooms Spaces</option>
              <option value="Pixel Avatar Animation">Pixel Avatar Animation</option>
              <option value="Chibi / VN Character Animation">
                Chibi / VN Character Animation
              </option>
              <option value="Hyperreal Uncanny Human Models">
                Hyperreal Uncanny Human Models
              </option>
            </select>
          </div>

          <input
            id="artist-portfolio"
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            placeholder="portfolio link"
            autoComplete="url"
            required
            className="w-full rounded-xl border border-pink-200 bg-pink-50/70 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <div className="rounded-2xl border border-pink-100 bg-pink-50/60 p-4">
            <p className="mb-3 text-sm font-semibold text-foreground">styles</p>
            <div className="flex flex-wrap gap-2">
              {STYLE_OPTIONS.map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all ${
                    styles.includes(item)
                      ? "border-primary bg-primary text-white"
                      : "border-pink-200 bg-white text-foreground"
                  }`}
                >
                  <input
                    id={`artist-style-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    type="checkbox"
                    name="styles"
                    value={item}
                    checked={styles.includes(item)}
                    onChange={() => toggleStyle(item)}
                    autoComplete="off"
                    className="h-4 w-4 accent-pink-500"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <textarea
            id="artist-why"
            name="why"
            value={form.why}
            onChange={handleChange}
            placeholder="why do you want to help, and which horror references fit your work?"
            autoComplete="off"
            rows={4}
            className="w-full rounded-xl border border-pink-200 bg-pink-50/70 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <div className="grid gap-4 md:grid-cols-3">
            <input
              id="artist-availability"
              name="availability"
              value={form.availability}
              onChange={handleChange}
              placeholder="availability"
              autoComplete="off"
              className="w-full rounded-xl border border-pink-200 bg-pink-50/70 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            <input
              id="artist-years"
              name="years"
              value={form.years}
              onChange={handleChange}
              placeholder="years of experience"
              autoComplete="off"
              className="w-full rounded-xl border border-pink-200 bg-pink-50/70 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            <input
              id="artist-pricing"
              name="pricing"
              value={form.pricing}
              onChange={handleChange}
              placeholder="pricing / open to discuss"
              autoComplete="off"
              className="w-full rounded-xl border border-pink-200 bg-pink-50/70 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <input
            id="artist-contact"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="discord or email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-pink-200 bg-pink-50/70 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-between">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-kawaii disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  sending...
                </>
              ) : (
                "send to lottie <3"
              )}
            </button>

            <div className="text-sm">
              {submitted && <p className="text-pink-600">submitted successfully &lt;3</p>}
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
