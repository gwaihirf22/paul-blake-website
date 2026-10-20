import Head from "next/head";
import Link from "next/link";
import { MOMENTUM_SUPPORT_EMAIL as SUPPORT_EMAIL } from "../../lib/momentum";

// Support page for the Atomic Momentum app (the App Store's Support URL).
export default function MomentumSupport() {
  return (
    <>
      <Head>
        <title>Support - Atomic Momentum</title>
        <meta name="description" content="Help with Atomic Momentum, the habit tracker built on never missing twice." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <h1>Atomic Momentum support</h1>
        <p>
          Questions, bugs or ideas: email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. I read every
          message.
        </p>

        <section>
          <h2>Common questions</h2>

          <h3>Where are my habits stored?</h3>
          <p>
            Only on your phone. There&apos;s no account. Your phone&apos;s iCloud or computer backup includes them, so a
            new phone restored from a backup has them too.
          </p>

          <h3>A widget says to open the app</h3>
          <p>Open Momentum once. Widgets show your habits after the app has run.</p>

          <h3>Reminders don&apos;t arrive</h3>
          <p>
            Check Settings → Notifications → Momentum on your phone, and the habit&apos;s reminder in Momentum (Edit
            habit &amp; notifications). Focus modes can hold notifications back too.
          </p>

          <h3>Apple Health numbers don&apos;t show</h3>
          <p>
            In the Health app, go to Profile → Apps → Momentum and turn on the data the habit uses. Then use &quot;Sync
            now&quot; on the habit&apos;s page.
          </p>

          <h3>How do I get more freezes?</h3>
          <p>
            Streak milestones and habits formed each earn one, up to five in the bank. Vacation mode (Settings →
            Freezes) pauses everything without using any.
          </p>
        </section>

        <section>
          <h2>Privacy</h2>
          <p>
            Momentum collects nothing. Read the <Link href="/momentum/privacy">privacy policy</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
