<script setup lang="ts">
// Static content page — mirrors the original docs "About" section 1-to-1.
</script>

<template>
  <section id="about">
    <!-- Page Header -->
    <div class="about-header">
      <div class="vd-container-responsive">
        <h2 style="color: var(--vd-color-primary)">
          <i class="ph ph-compass"></i> About
        </h2>
        <p class="vd-text-lg vd-text-muted">
          Mission, vision, and constraints that shape Vanduo UI
        </p>
      </div>
    </div>

    <!-- The Shape of the Water — Founder's Message -->
    <div class="founders-message">
      <div class="founders-message-inner">
        <h3 class="founders-message-title">The Shape of the Water</h3>
        <p class="founders-message-subtitle">
          A warm welcome and a message from Vanduo Open Source Software
        </p>

        <hr class="founders-divider" />

        <div class="founders-message-body">
          <p>
            We invite you to explore our philosophy, and we genuinely appreciate
            the time you are taking to read our story.
          </p>
          <p>
            The fact that you're here, spending a few of your minutes with us,
            means more than any star count or download metric ever could. So
            before anything else: <em>thank you.</em>
          </p>

          <hr class="founders-divider" />

          <h3>So what <em>is</em> Vanduo?</h3>
          <p>
            <strong
              >Vanduo is the best friend of Dynamic Web, SPA, Lazy Loading, and
              Static Web alike.</strong
            >
          </p>
          <p>
            Think of it this way: not every page on the internet needs a
            reactive state machine. Not every portfolio, documentation site, or
            landing page needs to ship a JavaScript runtime to the browser
            before a single word of text appears on screen. But those pages
            <em>do</em> deserve to appear beautiful, feel responsive, and load
            instantly.
          </p>
          <p>That's where Vanduo lives.</p>
          <p>
            But here is the deeper answer: at its core, Vanduo is not a
            framework at all. It is a <strong>design language</strong> — a
            system of proportion, rhythm, and harmony that simply happens to be
            spoken in HTML, CSS, and JavaScript.
          </p>
          <p>
            And the grammar of that language is older than the web, older than
            us. It is the <strong>golden ratio</strong> and the
            <strong>Fibonacci sequence</strong> — the same proportions that coil
            a nautilus shell, arrange the seeds in a sunflower, branch a tree,
            and turn a galaxy on its arm. Nature has been composing with these
            numbers for billions of years; we simply borrowed her vocabulary.
            When spacing, type, and layout follow the proportions the universe
            already trusts, a design feels balanced before you've touched a
            single value — because, on some quiet level, it already is.
          </p>

          <hr class="founders-divider" />

          <h3>The shape it takes</h3>
          <p>
            And because Vanduo is a design language rather than a runtime, the
            design does not depend on any one way of reaching the screen. The
            <strong>vd3</strong> line pours that design language into
            <strong>Vue&nbsp;3</strong> — components, composables, reactivity,
            and server-side rendering. When your project already lives in a
            reactive world, Vanduo flows right into it; the very page you're
            reading is rendered this way.
          </p>
          <p>
            A single source of truth feeds it all — the tokens in
            <code>@vanduo-oss/vd3</code> — so proportion, rhythm, and colour
            come out identical wherever the design appears. You compose with
            <code>&lt;Vd*&gt;</code> components and <code>useX</code>
            composables; the golden-ratio grammar beneath them never changes.
            Same look, same feel, same tokens — only your app's wiring ever
            lives on top. That, too, is the shape of the water.
          </p>

          <hr class="founders-divider" />

          <h3>Why we built this</h3>
          <p>
            We started Vanduo because we noticed something: the web had become
            heavy. Not heavy in a bad-faith way — heavy because, somewhere along
            the line, the simplest possible website began requiring a
            <code>node_modules</code> folder, a bundler config, and a PhD in
            toolchain orchestration.
          </p>
          <p>We asked ourselves: <em>what if we went the other way?</em></p>
          <p>
            What if we stripped away everything that doesn't serve the developer
            or the end user? What if we treated constraints — zero third-party
            dependencies, no mandatory build step, simple setup — not as
            limitations, but as a creative compass?
          </p>
          <p>
            The answer was water. Essential, transparent, adaptable.
            <em>Vanduo.</em>
          </p>

          <hr class="founders-divider" />

          <h3>Our hopes, dreams, and ambitions</h3>
          <p>
            We hope to keep Vanduo <strong>lean</strong>. Every kilobyte should
            earn its place. If something doesn't serve you or your users, we
            want the courage to leave it out.
          </p>
          <p>
            We dream of keeping Vanduo <strong>honest</strong>. No magic, no
            black boxes. You can read every line we ship — and we hope you will.
            Understanding your tools shouldn't require a decoder ring.
          </p>
          <p>
            We aspire to keep Vanduo <strong>open</strong> — not open as a
            marketing strategy, but open as a principle. This is not a product
            with a free tier. This is a gift to the community, maintained with
            care, documented with pride, and released under a license that means
            what it says.
          </p>
          <p>
            And above all, our deepest ambition is to keep Vanduo
            <strong>for you</strong>. Not for hype cycles, not for benchmarks,
            not for conference talks — for the developer sitting at a desk at 2
            AM who just wants their site to look great without fighting a
            framework.
          </p>
          <p>
            We're not there yet on all of these. But having the right ambitions
            matters, and these are ours.
          </p>

          <hr class="founders-divider" />

          <h3>For every kind of builder</h3>
          <p>The way people build for the web is changing — fast.</p>
          <p>
            There are <strong>vibe coders</strong> spinning up entire projects
            in an afternoon with AI at the wheel. There are
            <strong>weekend builders</strong> turning side ideas into real
            products between Saturday coffee and Sunday dinner. There are
            <strong>solo devs</strong> wearing every hat,
            <strong>small teams</strong> punching above their weight, and
            <strong>hustlers</strong> who need their landing page live
            <em>yesterday</em>.
          </p>
          <p>We see all of you. And we built Vanduo with all of you in mind.</p>
          <p>
            Our ambition is to make Vanduo
            <strong>AI-friendly while being developer-friendly first</strong> —
            and we mean <em>every</em> kind of developer:
          </p>

          <ul>
            <li>
              The <strong>full AI vibe coder</strong> who wants to describe a
              page and watch it materialize.
            </li>
            <li>
              The <strong>hybrid developer</strong> who pairs with AI but keeps
              their hands on the wheel.
            </li>
            <li>
              The <strong>no-AI purist</strong> who wants to understand every
              single line and wouldn't have it any other way.
            </li>
          </ul>

          <p>
            Vanduo works for all three because there is nothing hidden. No
            abstraction layer to confuse a language model. No magic syntax that
            only makes sense if you've read 400 pages of documentation. Just
            HTML, CSS, and JavaScript — the languages that both humans and AI
            already speak fluently.
          </p>
          <p>
            That's also why we've already started including
            <strong><code>llms.txt</code></strong> files in our repository —
            structured, AI-readable summaries of the entire framework. It's a
            small step, but it's a natural evolution of how we build the web.
            Because if the future of development is a conversation between human
            creativity and machine capability, we want Vanduo to be a language
            they both understand.
          </p>

          <hr class="founders-divider" />

          <h3>A small thing can matter</h3>
          <p>
            We don't need to be the biggest framework. We don't need to be on
            every trending list. If Vanduo helps even one developer ship a
            project they're proud of — a project that loads in a blink, looks
            polished on every device, and was <em>fun</em> to build — then
            everything we've poured into this was worth it.
          </p>
          <p>
            Water doesn't compete with fire. It doesn't compete with earth. It
            just flows, adapts, and gives life wherever it goes. Just as water
            is essential for life, we believe a good CSS framework should be
            essential yet unobtrusive -- flowing naturally into your projects
            without forcing you to change your workflow. Water adapts to its
            container; Vanduo adapts to your design.
          </p>
          <p>That's the shape of the water. That's Vanduo.</p>
          <p>
            <strong
              >We invite you to let your ideas flow just as freely. Join us, and
              let's build something lasting together.</strong
            >
          </p>
        </div>

        <div class="founders-signoff">
          <p>With gratitude and warm regards,</p>
          <a
            href="https://github.com/vanduo-oss"
            target="_blank"
            rel="noopener noreferrer"
            class="founders-signoff-org"
            >Vanduo Open Source Software</a
          >
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div style="padding: 3rem 0">
      <div class="vd-container-responsive" style="max-width: 1100px">
        <div class="about-section">
          <div class="vd-card about-card">
            <div class="vd-card-body">
              <h3 style="color: var(--vd-color-primary)">
                <i class="ph ph-info vd-mr-2" style="margin-right: 0.75rem"></i
                >What "Vanduo" Means
              </h3>
              <p>
                <strong>Vanduo</strong> (pronounced <em>van-doo-oh</em>) is
                derived from
                <img
                  src="/images/lithuania-waving-flag.svg"
                  alt="Lithuania flag"
                  style="
                    height: 1.2em;
                    width: auto;
                    vertical-align: text-bottom;
                    margin-right: 0.2rem;
                    display: inline-block;
                  "
                />
                <a
                  href="https://en.wikipedia.org/wiki/Lithuanian_language"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    text-decoration: underline;
                    color: var(--vd-color-primary);
                  "
                  >Lithuanian</a
                >: <em>vanduo</em> means "water."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.founders-message {
  padding: 4rem 0 3rem;
  background: linear-gradient(
    180deg,
    var(--vd-bg-primary) 0%,
    var(--vd-bg-secondary) 100%
  );
}

.founders-message-inner {
  max-width: 820px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.founders-message-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vd-color-primary);
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.founders-message-subtitle {
  font-size: 1.1rem;
  color: var(--vd-text-muted);
  text-align: center;
  font-style: italic;
  margin-bottom: 2.5rem;
}

.founders-divider {
  width: 80px;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--vd-color-primary),
    var(--vd-color-info)
  );
  border: none;
  margin: 2.5rem auto;
  border-radius: 2px;
}

.founders-message-body p {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--vd-text-secondary);
  margin-bottom: 1.25rem;
}

.founders-message-body p:first-child {
  font-size: 1.15rem;
  color: var(--vd-text-primary);
}

.founders-message-body h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vd-color-primary);
  margin-top: 0;
  margin-bottom: 1rem;
}

.founders-message-body strong {
  color: var(--vd-text-primary);
}

.founders-message-body em {
  color: var(--vd-text-primary);
  font-style: italic;
}

.founders-message-body ul {
  list-style: none;
  padding: 0;
  margin: 1.25rem 0;
}

.founders-message-body ul li {
  position: relative;
  padding-left: 1.75rem;
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--vd-text-secondary);
}

.founders-message-body ul li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--vd-color-primary),
    var(--vd-color-info)
  );
}

.founders-signoff {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vd-border-color);
  color: var(--vd-text-secondary);
  font-size: 1.05rem;
  line-height: 1.8;
}

.founders-signoff strong {
  color: var(--vd-color-primary);
  display: block;
  font-size: 1.1rem;
}

.founders-signoff-org {
  display: block;
  margin-top: 0.25rem;
  color: var(--vd-text-muted);
  font-style: italic;
  text-decoration: none;
}

.founders-signoff-org:hover {
  color: var(--vd-color-primary);
  text-decoration: underline;
}

.founders-signoff em {
  color: var(--vd-text-muted);
}

@media (max-width: 767.98px) {
  .founders-message-title {
    font-size: 1.75rem;
  }

  .founders-message-subtitle {
    font-size: 0.95rem;
  }

  .founders-message-body p {
    font-size: 0.95rem;
  }

  .founders-message-body h3 {
    font-size: 1.2rem;
  }
}
</style>
