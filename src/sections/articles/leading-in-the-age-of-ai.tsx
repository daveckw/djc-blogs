'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostDetailsHero } from '../blog/post-details-hero';

// ----------------------------------------------------------------------

const TITLE = 'Leading in the Age of AI: The DJC Way';
const DESCRIPTION =
  'Tools are changing every quarter, but leadership principles stay. This piece explores how DJC combines clear direction, radical transparency and data-driven coaching.';
const TAGS = ['Leadership', 'AI', 'Management', 'Culture', 'Systems'];
const COVER_URL = '/assets/images/blog/blog-3.jpg';
const CREATED_AT = '2025-12-09';
const AUTHOR = {
  name: 'DJC Team',
  avatarUrl: '/assets/images/avatar/avatar-1.webp',
};

// ----------------------------------------------------------------------

export function LeadingInTheAgeOfAiView() {
  return (
    <>
      <PostDetailsHero title={TITLE} author={AUTHOR} coverUrl={COVER_URL} createdAt={CREATED_AT} />

      <Container
        maxWidth={false}
        sx={[(theme) => ({ py: 3, mb: 5, borderBottom: `solid 1px ${theme.vars.palette.divider}` })]}
      >
        <CustomBreadcrumbs
          links={[{ name: 'Home', href: '/' }, { name: 'Blogs', href: '/#blogs' }, { name: TITLE }]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            {DESCRIPTION}
          </Typography>

          {/* Article Content */}
          <Typography
            component="div"
            sx={{
              '& h3': { mt: 4, mb: 2 },
              '& h4': { mt: 3, mb: 1.5 },
              '& p': { mb: 2, lineHeight: 1.8 },
              '& ul, & ol': { mb: 2, pl: 3 },
              '& li': { mb: 1 },
              '& blockquote': {
                pl: 2,
                py: 1,
                my: 2,
                borderLeft: 4,
                borderColor: 'primary.main',
                fontStyle: 'italic',
                bgcolor: 'grey.50',
              },
            }}
          >
            <p>Leadership is changing faster than ever.</p>

            <p>
              Teams today operate in an environment where technology evolves monthly, competition
              accelerates, and information overload is constant. The leaders who thrive are no
              longer the ones who &quot;work the hardest&quot;, but the ones who master{' '}
              <strong>clarity, systems, and leverage</strong>.
            </p>

            <p>
              At DJC, we developed a leadership philosophy designed specifically for the AI era — a
              world where human judgment and AI automation must work together, not against each
              other.
            </p>

            <p>
              This article breaks down how modern leaders can build strong teams, create predictable
              results, and stay calm in chaos… by leading the DJC way.
            </p>

            <h3>The Role of a Leader Has Transformed</h3>

            <p>Not long ago, a &quot;good leader&quot; was someone who:</p>

            <ul>
              <li>Knew everything</li>
              <li>Controlled decisions</li>
              <li>Worked long hours</li>
              <li>Solved everyone&apos;s problems</li>
              <li>Pushed the team manually</li>
            </ul>

            <p>But in the AI era, this traditional model collapses.</p>

            <p>
              Why? Because information moves too fast. Because complexity is too high. Because the
              team cannot scale if everything depends on the leader&apos;s presence.
            </p>

            <p>Today&apos;s leader must operate differently:</p>

            <p>
              <strong>Modern leaders don&apos;t run the team — they design the system.</strong>
            </p>

            <p>This single shift changes everything.</p>

            <h3>Principle 1: Set Direction with Absolute Clarity</h3>

            <p>
              Your team cannot guess your destination. They cannot read your mind. They cannot act
              consistently without a clear compass.
            </p>

            <p>
              Most teams struggle not because they are unskilled, but because their{' '}
              <strong>leader is unclear</strong>.
            </p>

            <p>At DJC, every leader is trained to answer 3 questions with precision:</p>

            <ol>
              <li>
                <strong>Where are we going?</strong> (Vision)
              </li>
              <li>
                <strong>How do we get there?</strong> (Strategy)
              </li>
              <li>
                <strong>What must we do this week?</strong> (Execution)
              </li>
            </ol>

            <p>When direction is clear:</p>

            <ul>
              <li>Confusion disappears</li>
              <li>Politics vanish</li>
              <li>Energy aligns</li>
              <li>People gain confidence</li>
            </ul>

            <p>Clarity is the first superpower of an AI-era leader.</p>

            <h3>Principle 2: Build Systems That Carry the Weight</h3>

            <p>If your team collapses when you are absent, it means:</p>

            <ul>
              <li>You were the system.</li>
              <li>Your team depended on your memory, mood, and motivation.</li>
            </ul>

            <p>This is not leadership — it is self-imposed imprisonment.</p>

            <p>AI allows leaders to build:</p>

            <ul>
              <li>Automated onboarding</li>
              <li>Auto-follow-up flows</li>
              <li>Standard messaging frameworks</li>
              <li>Tracking dashboards</li>
              <li>Playbooks for every key task</li>
            </ul>

            <p>When the system carries the weight:</p>

            <ul>
              <li>Results become predictable</li>
              <li>Team performance becomes measurable</li>
              <li>New members perform faster</li>
              <li>Leader stress drops dramatically</li>
            </ul>

            <p>A strong leader designs the machine, not runs inside the machine.</p>

            <h3>Principle 3: Use AI as Your Leadership Extension</h3>

            <p>AI is not here to replace leaders. It is here to extend leaders.</p>

            <p>DJC leaders use AI to:</p>

            <ul>
              <li>Review leads and spot patterns</li>
              <li>Generate better scripts and playbooks</li>
              <li>Analyse weak points in performance</li>
              <li>Prepare meeting summaries</li>
              <li>Draft SOPs and documentation</li>
              <li>Provide agents with 24/7 coaching</li>
            </ul>

            <p>
              AI becomes your <strong>amplifier</strong>, allowing you to lead hundreds with the
              same clarity and intensity as leading ten.
            </p>

            <p>The question is no longer:</p>

            <blockquote>&quot;Should I use AI?&quot;</blockquote>

            <p>The real question is:</p>

            <p>
              <strong>
                &quot;How much more effective can I become if AI handles 70% of the operational
                load?&quot;
              </strong>
            </p>

            <h3>Principle 4: Manage by Numbers, Coach by Behaviour</h3>

            <p>Modern leadership requires two lenses:</p>

            <h4>1. Dashboard Lens — What is happening?</h4>

            <p>AI and automation allow managers to track:</p>

            <ul>
              <li>Response time</li>
              <li>Follow-up consistency</li>
              <li>Appointment set rate</li>
              <li>Show-up rate</li>
              <li>Conversion rate</li>
              <li>Source effectiveness</li>
            </ul>

            <p>Data doesn&apos;t lie. Stories do.</p>

            <h4>2. Human Lens — Why is it happening?</h4>

            <p>Once the numbers reveal the issue, the leader steps in:</p>

            <ul>
              <li>Coaching</li>
              <li>Clarifying</li>
              <li>Removing obstacles</li>
              <li>Motivating</li>
              <li>Developing talent</li>
            </ul>

            <p>
              DJC leaders do not &quot;guess&quot; where the problem is. They diagnose it
              scientifically and solve it compassionately.
            </p>

            <p>
              This combination of <strong>data + empathy</strong> defines the modern leader.
            </p>

            <h3>Principle 5: Culture Is Your Invisible System</h3>

            <p>Systems control actions. Culture controls beliefs.</p>

            <p>A team&apos;s culture is shaped by:</p>

            <ul>
              <li>What leaders praise</li>
              <li>What leaders tolerate</li>
              <li>The stories leaders repeat</li>
              <li>How leaders respond to stress</li>
              <li>The standards leaders enforce</li>
            </ul>

            <p>At DJC, we reinforce 3 cultural pillars every week:</p>

            <p>
              <strong>1. We don&apos;t rely on heroes — we rely on systems.</strong>
              <br />
              No one is above the process. Everyone contributes to upgrading it.
            </p>

            <p>
              <strong>2. We move fast, improve fast.</strong>
              <br />
              Speed without reflection is chaos. Reflection without speed is stagnation.
            </p>

            <p>
              <strong>3. We play long-term games.</strong>
              <br />
              No shortcuts. No short-term manipulation. Only compounding improvement.
            </p>

            <p>
              Culture is not a slogan. It is the invisible architecture that determines whether a
              team can scale.
            </p>

            <h3>Principle 6: Calm Is a Leadership Skill</h3>

            <p>AI makes things faster. Markets move quicker. Information overwhelms.</p>

            <p>
              In this environment, the greatest leaders are not the loudest — they are the{' '}
              <strong>calmest</strong>.
            </p>

            <p>Why? Because a calm leader:</p>

            <ul>
              <li>Makes better decisions</li>
              <li>Reduces team anxiety</li>
              <li>Sees the big picture</li>
              <li>Creates stability and trust</li>
              <li>Thinks strategically, not reactively</li>
            </ul>

            <p>
              At DJC, a calm leader is considered an asset. A reactive leader is considered a
              liability.
            </p>

            <h3>Principle 7: Leaders Build Leaders</h3>

            <p>The ultimate measurement of leadership is simple:</p>

            <p>
              <strong>Can your team operate without you?</strong>
            </p>

            <p>If the answer is yes, you have succeeded as a leader.</p>

            <p>If the answer is no, you have built dependency, not strength.</p>

            <p>DJC leaders:</p>

            <ul>
              <li>Delegate</li>
              <li>Document</li>
              <li>Coach</li>
              <li>Empower</li>
              <li>Remove bottlenecks</li>
              <li>Develop successors</li>
            </ul>

            <p>A leader who builds leaders creates an organisation that lasts.</p>

            <h3>Final Thought: Leadership in the AI Era Is a New Game</h3>

            <p>The future belongs to leaders who can combine:</p>

            <p>
              <strong>Clarity</strong> — Where are we going?
            </p>

            <p>
              <strong>Systems</strong> — How do we get there consistently?
            </p>

            <p>
              <strong>AI leverage</strong> — What can technology do better than humans?
            </p>

            <p>
              <strong>Human mastery</strong> — What can humans do that AI cannot?
            </p>

            <p>This is the DJC way.</p>

            <p>
              A leader is no longer defined by hard work. A leader is defined by their ability to
              build a <strong>scalable organisation</strong>, powered by systems, amplified by AI,
              and united by culture.
            </p>
          </Typography>

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
            {TAGS.map((tag) => (
              <Chip key={tag} label={tag} variant="soft" />
            ))}
          </Box>
        </Stack>
      </Container>
    </>
  );
}

// Export metadata for the page
export const leadingInTheAgeOfAiMeta = {
  title: `${TITLE} | DJC Blogs`,
  description: DESCRIPTION,
};
