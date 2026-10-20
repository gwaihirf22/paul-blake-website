import Head from "next/head";
import Link from "next/link";
import { MOMENTUM_SUPPORT_EMAIL as SUPPORT_EMAIL } from "../../lib/momentum";

// The privacy policy for the Atomic Momentum app, linked from its App Store
// listing and from Settings in the app. Keep it in step with
// atomic-momentum/docs/store/privacy-policy.md.
const EFFECTIVE = "October 20, 2026";

export default function MomentumPrivacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Atomic Momentum</title>
        <meta name="description" content="Atomic Momentum keeps your habits on your phone: no accounts, no ads, no tracking." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <h1>Atomic Momentum privacy policy</h1>
        <p><em>Effective {EFFECTIVE}</em></p>
        <p>
          Atomic Momentum is a habit tracker. It was made to keep your habits private, and it has nothing to sell: no
          ads, no accounts, no tracking.
        </p>

        <section>
          <h2>The short version</h2>
          <ul>
            <li>
              <strong>Nothing you put in Momentum leaves your phone.</strong> It has no servers and no accounts, and it
              doesn&apos;t send your habits or Health data anywhere.
            </li>
            <li><strong>No ads, analytics or tracking.</strong> No one is watching how you use it, including us.</li>
          </ul>
        </section>

        <section>
          <h2>What Momentum keeps, and where</h2>
          <ul>
            <li>
              <strong>Kept on your device:</strong> your habits, the days you log, notes, quotes you save or write,
              categories, achievements and settings; for habits you link to Apple Health, the latest numbers read from
              Health, so the app can show them without asking again.
            </li>
            <li><strong>Who can see it:</strong> only Momentum and its widgets on your phone.</li>
            <li>
              <strong>Backups:</strong> iOS includes this data in your phone&apos;s backups (iCloud or your computer), if
              you&apos;ve turned those on, the same as other apps&apos; data. Momentum doesn&apos;t make copies of its own.
            </li>
            <li><strong>Deleting it:</strong> deleting the app deletes this data.</li>
          </ul>
        </section>

        <section>
          <h2>Apple Health</h2>
          <p>
            You choose whether to link a habit to Apple Health, and which data Momentum may use. You can change this at
            any time in the Health app (Profile → Apps → Momentum).
          </p>
          <ul>
            <li>
              <strong>Reading:</strong> steps, exercise minutes, workouts, sleep, mindful minutes and water, to fill in
              habits you&apos;ve linked.
            </li>
            <li>
              <strong>Writing:</strong> water and mindful minutes, only when you log them in a linked habit.
            </li>
            <li>
              <strong>Never:</strong> Health data is never used for advertising or marketing, never sold, and never
              shared with anyone. It isn&apos;t sent anywhere, since Momentum has no servers.
            </li>
          </ul>
        </section>

        <section>
          <h2>Notifications</h2>
          <p>
            Reminders and streak warnings are scheduled on your phone by Momentum itself. They don&apos;t go through any
            server.
          </p>
        </section>

        <section>
          <h2>Sharing</h2>
          <p>
            When you share a card (an achievement, a streak, a quote), Momentum makes a picture on your phone and hands
            it to the share sheet. Where it goes is up to you. Momentum doesn&apos;t keep a copy or see where you sent it.
          </p>
        </section>

        <section>
          <h2>Links</h2>
          <p>
            Momentum opens a web page only when you tap a link (for example &quot;Buy me a coffee&quot;, where it&apos;s
            shown). That page belongs to its own site, and that site&apos;s privacy policy applies there.
          </p>
        </section>

        <section>
          <h2>Children</h2>
          <p>Momentum is suitable for everyone and collects nothing from anyone, children included.</p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>
            If this policy changes, the new version will be posted here with a new date. Since Momentum collects
            nothing, any change that would collect something would be stated plainly in the app first.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Help with the app is on the{" "}
            <Link href="/momentum/support">support page</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
