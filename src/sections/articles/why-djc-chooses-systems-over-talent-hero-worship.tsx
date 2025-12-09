'use client';

import type { IPostItem } from 'src/types/blog';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostDetailsHero } from '../blog/post-details-hero';

// ----------------------------------------------------------------------

export const ARTICLE_DATA: IPostItem = {
  id: 'why-djc-chooses-systems-over-talent-hero-worship',
  title: 'Why DJC Chooses Systems Over Talent Hero Worship',
  tags: ['Philosophy', 'Systems', 'AI', 'Leadership'],
  publish: 'published',
  coverUrl: '/assets/images/blog/blog-1.jpg',
  metaTitle: 'Why DJC Chooses Systems Over Talent Hero Worship | DJC Blogs',
  totalViews: 0,
  totalShares: 0,
  description:
    'Many companies secretly rely on one or two "superheroes" to save the month. At DJC, we deliberately build in the opposite direction: the system wins, not the hero.',
  totalComments: 0,
  createdAt: '2025-01-01',
  totalFavorites: 0,
  metaKeywords: ['systems', 'AI', 'business', 'leadership', 'automation', 'DJC'],
  metaDescription:
    'Why DJC builds systems instead of relying on superstar employees – and how you can do the same in your business.',
  comments: [],
  author: {
    name: 'DJC Team',
    avatarUrl: '/assets/images/avatar/avatar-1.webp',
  },
  favoritePerson: [],
  content: `
<p>
  Every growing business goes through this stage: there is always that one closer, that one programmer, that one leader who can "settle everything". As revenue rises, the organisation quietly becomes <strong>dependent on a few heroic individuals</strong>.
</p>

<p>
  The problem? When the hero is tired, distracted or leaves, <strong>results collapse overnight</strong>. We have seen this pattern again and again across sales teams, tech teams and even management teams.
</p>

<h3>The hidden cost of hero worship</h3>

<p>On the surface, having a superstar looks like a blessing:</p>

<ul>
  <li>Your "top closer" always hits target.</li>
  <li>Your "star programmer" delivers features last minute.</li>
  <li>Your "operations queen/king" knows every process in their head.</li>
</ul>

<p>But underneath, several dangerous things are happening:</p>

<ul>
  <li><strong>No one else really learns.</strong> Why bother building skill when "the hero will settle"?</li>
  <li><strong>No one documents properly.</strong> Knowledge stays inside WhatsApp chats and people's brains.</li>
  <li><strong>No one questions the model.</strong> As long as the hero is performing, the system is never upgraded.</li>
</ul>

<h3>DJC's decision: design for replacement, not dependence</h3>

<p>
  At DJC, we made a strategic decision: <strong>every key result must be system-dependent, not person-dependent</strong>.
</p>

<p>
  That doesn't mean we don't value talent. It means we value talent for <em>building and improving systems</em>, not for being the only one who can perform.
</p>

<h4>Our 3 rules when talent shows up</h4>

<ol>
  <li>
    <strong>Turn talent into a template.</strong><br />
    When someone performs exceptionally well (e.g. in sales), we immediately ask: "What exactly did they say, do, send, schedule?" Then we <strong>capture it into scripts, flows and checklists</strong>.
  </li>
  <li>
    <strong>Let AI & automation scale it.</strong><br />
    Once the pattern is clear, we encode it into WhatsApp flows, auto follow-up sequences, lead scoring rules and dashboards – so the system reproduces that behaviour 24/7.
  </li>
  <li>
    <strong>Train the rest using the system.</strong><br />
    New people don't need to "sit next to the hero" for months. They learn through <strong>playbooks, AI-assisted coaching and structured routines</strong>.
  </li>
</ol>

<h3>What a systems-first business actually looks like</h3>

<p>In a traditional hero-driven team, your weekly dashboard looks like this:</p>

<ul>
  <li>Top 1–2 people carry 60–80% of the numbers.</li>
  <li>Managers spend their time chasing people in WhatsApp.</li>
  <li>Leads are handled differently depending on "who picked it up".</li>
</ul>

<p>In a systems-first DJC-style team, things feel very different:</p>

<ul>
  <li><strong>Leads enter through a standardised funnel.</strong> AI greets them, qualifies them and routes them based on clear rules.</li>
  <li><strong>Follow-up is not "when I remember".</strong> It is a designed sequence: Day 0, Day 1, Day 3, Day 7, Day 14 – with different angles and scripts.</li>
  <li><strong>Managers coach from data, not from guessing.</strong> Dashboards show: reply time, follow-up consistency, show-up rate, close rate by source, etc.</li>
</ul>

<p>
  When the system is strong, the "average performer" becomes <strong>dangerously productive</strong>. That is where real scale happens.
</p>

<h3>How DJC uses AI to protect the system (and the people)</h3>

<p>
  AI is not the hero either. It is the <strong>loyal assistant to the system</strong>. Here is how we use AI inside DJC:
</p>

<ul>
  <li>
    <strong>Standardising "best messages".</strong><br />
    When we see WhatsApp replies that convert well, we train the AI to mirror the same tone, structure and logic – not just random "chatty" responses.
  </li>
  <li>
    <strong>Auto follow-up without mood swings.</strong><br />
    Humans get tired, distracted, emotional. The AI doesn't. It follows the designed follow-up logic <em>exactly as planned</em>.
  </li>
  <li>
    <strong>Surfacing weak points.</strong><br />
    AI helps highlight where the system is leaking: leads not tagged, appointments not confirmed, proposals not followed up.
  </li>
</ul>

<p>
  Notice the pattern: we are always asking, <strong>"How do we upgrade the system?"</strong> not "How do we push people harder?"
</p>

<h3>Shifting your culture: from hero stories to system stories</h3>

<p>
  Culture is built by the stories you repeat in meetings, chats and celebrations. If you only celebrate the hero – "Wah, this person closed 5 deals in 1 day!" – you are teaching your team to depend on raw talent.
</p>

<p>At DJC, we consciously celebrate different stories:</p>

<ul>
  <li><strong>"This new script increased show-up rate by 18%."</strong></li>
  <li><strong>"This new follow-up flow helped 10 agents close their first deal."</strong></li>
  <li><strong>"This dashboard helped us spot a leak and recover RMXX,XXX."</strong></li>
</ul>

<p>
  The message is clear: <strong>we are all builders of the machine</strong>, not just performers inside it.
</p>

<h3>How to start moving away from hero dependence (in 7 days)</h3>

<p>You don't need to rebuild everything overnight. Here is a simple 7-day challenge:</p>

<ol>
  <li>
    <strong>List your "heroes".</strong><br />
    Who are the people your business would panic without?
  </li>
  <li>
    <strong>Pick just one process.</strong><br />
    For example: "How we handle a new WhatsApp lead".
  </li>
  <li>
    <strong>Watch what the hero actually does.</strong><br />
    Record calls (with consent), observe messages, note exact steps.
  </li>
  <li>
    <strong>Write the playbook.</strong><br />
    Turn what you saw into a step-by-step flow with scripts and examples.
  </li>
  <li>
    <strong>Put AI & automation in the loop.</strong><br />
    Use your tools (like DJC's systems) to automate as many steps as possible.
  </li>
  <li>
    <strong>Train 3 normal people using the playbook.</strong><br />
    See if they can perform at 70–80% of the hero's level.
  </li>
  <li>
    <strong>Review and refine weekly.</strong><br />
    The first version won't be perfect. That's fine. The goal is progress, not perfection.
  </li>
</ol>

<h3>Final thought: design a business that can survive your absence</h3>

<p>
  The ultimate test of a founder or leader is simple: <strong>Can your business run without you for 30 days?</strong>
</p>

<p>
  If the answer is "no", don't feel guilty. Just recognise what it means: you are still the main hero, and your company is still fragile.
</p>

<p>
  At DJC, we are far from perfect, but this is our North Star: <strong>build systems so strong that talent becomes a multiplier, not a crutch</strong>.
</p>

<p>
  If this article resonates with you, start with one process, one playbook, one system upgrade. Over time, you will wake up one day and realise: <strong>you no longer need heroes – you have a machine</strong>.
</p>
`,
};

// ----------------------------------------------------------------------

export function ArticleSystemsOverHeroesView() {
  const { title, description, content, tags, author, coverUrl, createdAt } = ARTICLE_DATA;

  return (
    <>
      <PostDetailsHero title={title} author={author} coverUrl={coverUrl} createdAt={createdAt} />

      <Container
        maxWidth={false}
        sx={[(theme) => ({ py: 3, mb: 5, borderBottom: `solid 1px ${theme.vars.palette.divider}` })]}
      >
        <CustomBreadcrumbs
          links={[{ name: 'Home', href: '/' }, { name: 'Blogs', href: '/#blogs' }, { name: title }]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            {description}
          </Typography>

          <Markdown>{content}</Markdown>

          <Box
            sx={[
              (theme) => ({
                py: 3,
                mt: 5,
                gap: 1,
                display: 'flex',
                flexWrap: 'wrap',
                borderTop: `dashed 1px ${theme.vars.palette.divider}`,
              }),
            ]}
          >
            {tags.map((tag) => (
              <Chip key={tag} label={tag} variant="soft" />
            ))}
          </Box>
        </Stack>
      </Container>
    </>
  );
}
