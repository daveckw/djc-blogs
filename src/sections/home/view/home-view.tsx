'use client';

import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { varFade, MotionViewport } from 'src/components/animate';
import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { SectionTitle } from '../components/section-title';

// ----------------------------------------------------------------------

const PHILOSOPHY_ITEMS = [
  {
    title: 'Systems over superheroes',
    description:
      'Businesses that depend on "one hero" burn out. We design flows where the system carries the weight – from lead capture to follow-up to reporting – so people can focus on high-value thinking and relationships.',
  },
  {
    title: 'AI as a partner, not a boss',
    description:
      'AI should extend your judgment, not replace your brain. We treat AI as a relentless assistant – handling repetitive work, surfacing insights, and making it easier for leaders to make calm, strategic decisions.',
  },
  {
    title: 'Play long-term, execute daily',
    description:
      'We think in 5- to 10-year horizons, but we move in focused daily sprints. Compounding only happens when philosophy meets daily habit – in sales, in product, in people development.',
  },
  {
    title: 'Document, share, upgrade',
    description:
      'Every framework, script and flow we build is documented, shared and improved with the community. DJC Blogs is one of the main places where those "living playbooks" are published.',
  },
];

const BLOG_POSTS = [
  {
    tag: 'Philosophy',
    title: 'Why DJC Chooses Systems Over Talent Hero Worship',
    excerpt:
      'Many teams secretly rely on one or two "firefighters" to save the month. In this essay, we unpack how DJC designs flows so that results don\'t collapse when the hero is tired.',
    readTime: '5 min read',
    audience: 'For founders & leaders',
    href: '/blogs/why-djc-chooses-systems-over-talent-hero-worship',
  },
  {
    tag: 'Playbook',
    title: 'From WhatsApp Chaos to Predictable Sales Machine',
    excerpt:
      'Behind the scenes of turning scattered chats into structured lead funnels using AI, tagging and follow-up logic – with real mistakes and lessons from the DJC ecosystem.',
    readTime: '8 min read',
    audience: 'With examples',
    href: '/blogs/from-whatsapp-chaos-to-predictable-sales-machine',
  },
  {
    tag: 'Leadership',
    title: 'Leading in the Age of AI: The DJC Way',
    excerpt:
      'Tools are changing every quarter, but leadership principles stay. This piece explores how DJC combines clear direction, radical transparency and data-driven coaching.',
    readTime: '6 min read',
    audience: 'For managers & HOTs',
    href: '/blogs/leading-in-the-age-of-ai',
  },
];

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
      />

      <BackToTopButton />

      {/* HERO */}
      <HomeHero />

      {/* PHILOSOPHY */}
      <HomePhilosophy />

      {/* BLOG LIST */}
      <HomeBlogList />
    </>
  );
}

// ----------------------------------------------------------------------

function HomeHero({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="section"
      id="about"
      sx={[
        (theme) => ({
          py: { xs: 6, md: 10 },
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(180deg, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)} 0%, ${theme.vars.palette.background.default} 100%)`,
              `url(${CONFIG.assetsDir}/assets/background/overlay.svg)`,
            ],
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionViewport}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <m.div variants={varFade('inUp', { distance: 24 })}>
              <Label color="primary" sx={{ mb: 3 }}>
                DJC Blogs – Notes from the AI frontline
              </Label>
            </m.div>

            <Typography
              component={m.h1}
              variants={varFade('inUp', { distance: 24 })}
              variant="h2"
              sx={{ mb: 3 }}
            >
              Building a world where{' '}
              <Box
                component="span"
                sx={(theme) => ({
                  ...theme.mixins.textGradient(
                    `135deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.warning.main}`
                  ),
                })}
              >
                systems & AI
              </Box>{' '}
              create freedom for humans.
            </Typography>

            <Typography
              component={m.p}
              variants={varFade('inUp', { distance: 24 })}
              sx={{ mb: 4, color: 'text.secondary', maxWidth: 540 }}
            >
              DJC is a <strong>Malaysia-born AI and systems company</strong> obsessed with one thing:
              turning chaotic business operations into <strong>predictable, scalable "machines"</strong>.
              This blog is where we document the thinking, experiments and scars along the journey.
            </Typography>

            <Stack
              component={m.div}
              variants={varFade('inUp', { distance: 24 })}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mb: 4 }}
            >
              <Button variant="contained" color="primary" size="large" href="#blogs">
                Read the latest posts →
              </Button>
              <Button variant="outlined" color="inherit" size="large" href="#philosophy">
                Understand the DJC philosophy
              </Button>
            </Stack>

            <Stack
              component={m.div}
              variants={varFade('inUp', { distance: 24 })}
              direction="row"
              flexWrap="wrap"
              spacing={3}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  AI, automation & real-world execution
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Written for entrepreneurs, leaders & builders
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              component={m.div}
              variants={varFade('inUp', { distance: 24 })}
              sx={(theme) => ({
                p: 3,
                background: `linear-gradient(145deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.08)}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.95)})`,
              })}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                <Typography variant="overline" color="text.secondary">
                  Founder&apos;s Note
                </Typography>
                <Label color="success" variant="soft">
                  Live Experiments
                </Label>
              </Stack>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={7}>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    DJC started with a simple frustration:{' '}
                    <strong>too many talented people are trapped doing low-value work</strong>. We believe
                    the future belongs to those who know how to combine{' '}
                    <strong>AI, systems and human judgment</strong> into one powerful engine.
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                    <Label variant="soft">AI that sells, not just talks</Label>
                    <Label variant="soft">Systems over heroics</Label>
                    <Label variant="soft">Long-term games</Label>
                  </Stack>
                </Grid>
                <Grid size={5}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="overline" color="text.secondary">
                      North Star
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={(theme) => ({
                        ...theme.mixins.textGradient(
                          `135deg, ${theme.vars.palette.text.primary}, ${theme.vars.palette.warning.main}`
                        ),
                      })}
                    >
                      30,000
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      subscribers empowered to{' '}
                      <Box component="span" sx={{ color: 'success.main', fontWeight: 600 }}>
                        sell smarter
                      </Box>
                      , not harder.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={(theme) => ({
                  pt: 2,
                  borderTop: `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                })}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={2}
                >
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      What this blog covers
                    </Typography>
                    <Typography variant="body2">
                      AI implementation, systems thinking, sales playbooks,{' '}
                      <Box
                        component="span"
                        sx={(theme) => ({
                          fontWeight: 600,
                          ...theme.mixins.textGradient(
                            `135deg, ${theme.vars.palette.warning.main}, ${theme.vars.palette.primary.main}`
                          ),
                        })}
                      >
                        real stories from the trenches
                      </Box>
                      .
                    </Typography>
                  </Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Stack direction="row">
                      {['DC', 'AI', 'YOU'].map((label, index) => (
                        <Box
                          key={label}
                          sx={(theme) => ({
                            width: 28,
                            height: 28,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            fontSize: 10,
                            fontWeight: 600,
                            color: 'text.primary',
                            bgcolor:
                              index === 0
                                ? 'grey.300'
                                : index === 1
                                  ? 'primary.lighter'
                                  : 'success.lighter',
                            ml: index > 0 ? -1 : 0,
                            border: `2px solid ${theme.vars.palette.background.paper}`,
                          })}
                        >
                          {label}
                        </Box>
                      ))}
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      Co-written with <strong>operators, agents & founders</strong>
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function HomePhilosophy({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="section"
      id="philosophy"
      sx={[{ py: { xs: 8, md: 12 } }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Container component={MotionViewport}>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionTitle
              caption="DJC Philosophy"
              title="How we think about building, selling"
              txtGradient="& leading"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              component={m.p}
              variants={varFade('inUp', { distance: 24 })}
              sx={{ color: 'text.secondary' }}
            >
              Technology is easy. People, systems and discipline are hard. The DJC philosophy is a set of
              principles that guide how we design products, grow teams and serve clients.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              component={m.div}
              variants={varFade('inUp', { distance: 24 })}
              sx={(theme) => ({
                p: 4,
                height: 1,
                background: `linear-gradient(145deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0.08)}, ${theme.vars.palette.background.paper})`,
              })}
            >
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2 }}>
                01 • Our core belief
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                DJC exists because we believe{' '}
                <strong>ordinary people can create extraordinary results</strong> when three things are in
                place: <strong>clarity of direction, discipline of execution, and leverage from AI & systems</strong>.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                We are not interested in "shiny toy" AI demos. We care about <strong>outcomes</strong>: more
                appointments set, more sales closed, more time given back to people so they can think,
                create and lead.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                Every article here is written with one question in mind:{' '}
                <strong>
                  "Will this help someone build a more resilient, scalable and humane business?"
                </strong>
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {PHILOSOPHY_ITEMS.map((item) => (
                <Card
                  key={item.title}
                  component={m.div}
                  variants={varFade('inUp', { distance: 24 })}
                  sx={{ p: 2.5 }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function HomeBlogList({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="section"
      id="blogs"
      sx={[
        (theme) => ({
          py: { xs: 8, md: 12 },
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container component={MotionViewport}>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionTitle
              caption="Latest Articles"
              title="From theory to dashboards, scripts"
              txtGradient="& sales calls"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              component={m.p}
              variants={varFade('inUp', { distance: 24 })}
              sx={{ color: 'text.secondary' }}
            >
              Here are some starting points. Replace these with real posts later, or connect this page to
              your CMS / blog engine.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {BLOG_POSTS.map((post) => (
            <Grid key={post.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                component={m.div}
                variants={varFade('inUp', { distance: 24 })}
                sx={{
                  p: 3,
                  height: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.customShadows.z24,
                  },
                }}
              >
                <Label color="primary" variant="soft" sx={{ alignSelf: 'flex-start', mb: 2 }}>
                  {post.tag}
                </Label>

                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {post.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', flexGrow: 1, mb: 2, lineHeight: 1.6 }}
                >
                  {post.excerpt}
                </Typography>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="text.disabled">
                    {post.readTime} · {post.audience}
                  </Typography>
                  <Link
                    href={post.href}
                    color="inherit"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontWeight: 600,
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    Read →
                  </Link>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
