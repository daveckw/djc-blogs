'use client';

import type { SlideImage } from 'yet-another-react-lightbox';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageListItem from '@mui/material/ImageListItem';

import { Lightbox, useLightBox } from 'src/components/lightbox';
import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

// ----------------------------------------------------------------------

const GALLERY_SLIDES: SlideImage[] = [
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-portrait.JPG',
    title: 'Xuan Xuan Portrait',
    description: "Ting Xuan's beautiful portrait",
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-exercise.jpg',
    title: 'Exercise Time',
    description: 'Fun exercise moments with Ting Xuan',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-chinese-new-year.JPG',
    title: 'Chinese New Year',
    description: 'Celebrating Chinese New Year',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-with-family.jpg',
    title: 'With Family',
    description: 'Beautiful family moment together',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-piano.jpg',
    title: 'Piano Performance',
    description: 'Ting Xuan playing the piano',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-little-chef.jpg',
    title: 'Little Chef',
    description: 'Xuan Xuan as a little chef',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-baby-with-baba-mama.jpg',
    title: 'Baby with Baba and Mama',
    description: 'Precious moments with parents',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-swimming-1.jpg',
    title: 'Swimming Fun',
    description: 'Enjoying swimming time',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-in-adelaide.jpg',
    title: 'In Adelaide',
    description: 'Adventures in Adelaide',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-with-baba.jpg',
    title: 'With Baba',
    description: 'Sweet moments with daddy',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-with-mama-in-australia.jpg',
    title: 'With Mama in Australia',
    description: 'Special time with mommy in Australia',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-with-cat.png',
    title: 'With Cat',
    description: 'Cute moment with furry friend',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-with-hayden.JPG',
    title: 'With Hayden',
    description: 'Fun time with Hayden',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-in-mcd.jpg',
    title: 'At McDonald\'s',
    description: 'Having fun at McDonald\'s',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-serving-meal.jpg',
    title: 'Serving Meal',
    description: 'Little helper serving meals',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-in-mama-office.jpg',
    title: 'In Mama\'s Office',
    description: 'Visiting mama at the office',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-at-factory.jpg',
    title: 'At Factory',
    description: 'Exploring the factory',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-in-china.JPG',
    title: 'In China',
    description: 'Visiting China',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-mama.JPG',
    title: 'With Mama',
    description: 'Precious moments with mama',
  },
  {
    src: '/assets/images/chong-ting-xuan/chong-ting-xuan-in-water-dive.png',
    title: 'Water Dive',
    description: 'Diving in the water',
  },
];

// ----------------------------------------------------------------------

export function GalleryView() {
  const theme = useTheme();
  const pageProgress = useScrollProgress();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const lightbox = useLightBox(GALLERY_SLIDES);

  const handleOpenLightbox = (imageUrl: string) => {
    lightbox.onOpen(imageUrl);
  };

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(muiTheme) => ({ position: 'fixed', zIndex: muiTheme.zIndex.appBar + 1 })]}
      />

      <BackToTopButton />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'primary.main',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
          overflow: 'hidden',
        }}
      >
        <Container>
          <Stack
            spacing={3}
            sx={{
              py: { xs: 15, md: 20 },
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 'bold',
                color: 'common.white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Ting Xuan's Gallery
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'common.white',
                opacity: 0.9,
                maxWidth: 600,
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Beautiful moments and precious memories captured in time
            </Typography>
          </Stack>
        </Container>

        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'url(/assets/images/chong-ting-xuan/chong-ting-xuan-exercise.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Box>

      {/* Gallery Section */}
      <Container>
        <Stack spacing={5} sx={{ py: { xs: 5, md: 10 } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 3,
            }}
          >
            Photo Gallery
          </Typography>

          <ImageList
            variant="masonry"
            cols={getColumns()}
            gap={16}
            sx={{
              mb: 0,
              '& .MuiImageListItem-root': {
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (muiTheme) => muiTheme.customShadows.z20,
                },
              },
            }}
          >
            {GALLERY_SLIDES.map((slide, index) => (
              <ImageListItem key={index} onClick={() => handleOpenLightbox(slide.src)}>
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover .overlay': {
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={slide.src}
                    alt={typeof slide.title === 'string' ? slide.title : 'Gallery image'}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: alpha(theme.palette.primary.main, 0.8),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'common.white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        px: 2,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      }}
                    >
                      {slide.title}
                    </Typography>
                  </Box>
                </Card>
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>
      </Container>

      <Lightbox
        slides={GALLERY_SLIDES}
        open={lightbox.open}
        close={lightbox.onClose}
        index={lightbox.selected}
      />
    </>
  );
}
