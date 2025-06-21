const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const archiver = require('archiver');

// GET /api/download/:id - Download generated code as ZIP
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate the generation ID format
    if (!id.match(/^gen_\d+_[a-z0-9]+$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid generation ID'
      });
    }

    const tempDir = path.join(__dirname, '../temp', id);
    
    try {
      await fs.access(tempDir);
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: 'Generated files not found',
        message: 'The requested generation may have expired or does not exist'
      });
    }

    console.log(`📦 Creating ZIP download for generation: ${id}`);

    // Set response headers for ZIP download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="boovy-generated-app-${id}.zip"`);

    // Create ZIP archive
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    // Handle archive errors
    archive.on('error', (err) => {
      console.error('Archive error:', err);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Failed to create ZIP archive'
        });
      }
    });

    // Pipe archive to response
    archive.pipe(res);

    // Add all files from temp directory to archive
    archive.directory(tempDir, false);

    // Finalize the archive
    await archive.finalize();

    console.log(`✅ ZIP download completed for generation: ${id}`);

    // Clean up temp files after a delay (in production, use a proper cleanup job)
    setTimeout(async () => {
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
        console.log(`🧹 Cleaned up temp files for generation: ${id}`);
      } catch (cleanupError) {
        console.error('Failed to cleanup temp files:', cleanupError);
      }
    }, 5 * 60 * 1000); // 5 minutes

  } catch (error) {
    console.error('Download endpoint error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: 'Failed to download files',
        message: error.message
      });
    }
  }
});

// GET /api/download - List available downloads (for debugging)
router.get('/', async (req, res) => {
  try {
    const tempDir = path.join(__dirname, '../temp');
    
    try {
      const entries = await fs.readdir(tempDir, { withFileTypes: true });
      const generations = entries
        .filter(entry => entry.isDirectory() && entry.name.startsWith('gen_'))
        .map(entry => ({
          id: entry.name,
          downloadUrl: `/api/download/${entry.name}`
        }));

      res.json({
        success: true,
        data: {
          availableDownloads: generations,
          count: generations.length
        }
      });
    } catch (error) {
      // Temp directory doesn't exist yet
      res.json({
        success: true,
        data: {
          availableDownloads: [],
          count: 0
        }
      });
    }

  } catch (error) {
    console.error('Download list endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list downloads'
    });
  }
});

module.exports = router;

