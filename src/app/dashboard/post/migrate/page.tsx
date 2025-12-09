'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

import { DashboardContent } from 'src/layouts/dashboard';
import { addSlugsToExistingPosts } from 'src/functions/blogFunctions';

// ----------------------------------------------------------------------

export default function MigratePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleMigrate = async () => {
    try {
      setLoading(true);
      setResult('');

      const count = await addSlugsToExistingPosts();

      if (count === 0) {
        setResult('All posts already have slugs. No migration needed.');
      } else {
        setResult(`Successfully added slugs to ${count} post(s).`);
      }
    } catch (error) {
      console.error(error);
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Post Migration Utility
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add Slugs to Existing Posts
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This utility will add slug fields to any existing posts that don't have them.
            Slugs are kebab-case versions of post titles (e.g., "My First Post" becomes
            "my-first-post") and are used in URLs.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={handleMigrate}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Migrating...' : 'Run Migration'}
            </Button>
          </Box>

          {result && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 1,
                bgcolor: result.startsWith('Error') ? 'error.lighter' : 'success.lighter',
              }}
            >
              <Typography
                variant="body2"
                color={result.startsWith('Error') ? 'error.dark' : 'success.dark'}
              >
                {result}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </DashboardContent>
  );
}
