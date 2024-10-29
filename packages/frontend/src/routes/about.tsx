import { Container, Typography, Box } from '@mui/material';

export default function About() {
  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="center">
        <Typography variant="h3" sx={{ mt: 2 }} gutterBottom>
          About Us
        </Typography>
      </Box>
      <img src="/src/assets/happysomeusers.png" alt="Happy Some User" style={{width: '100%', marginBottom: '20px'}}/>
      <Typography variant="body1" gutterBottom>
      <Typography component="span" sx={{ fontWeight: 'bold' }}>
        SoMe
      </Typography>
      {' '}is more than just a social media platform—it’s a space designed to connect, inspire, and empower people from all walks of life. Created by a passionate team of young developers,{' '}
      <Typography component="span" sx={{ fontWeight: 'bold' }}>
        SoMe
      </Typography>
      {' '}is on a mission to bring social interaction back to its roots, where meaningful conversations and genuine connections come first. Whether you’re looking to share moments, join communities, or discover inspiring content,{' '}
      <Typography component="span" sx={{ fontWeight: 'bold' }}>
        SoMe
      </Typography>
      {' '}is where it all happens.
      </Typography>
      <Box mt={4} />

      <Typography variant="h5" gutterBottom>
        Building Bridges Beyond Screens
      </Typography>
      <Typography variant="body1" gutterBottom>
        At{' '}
        <Typography component="span" sx={{ fontWeight: 'bold' }}>
          SoMe
        </Typography>
        , we believe that technology should enhance human connection, not replace it. We strive to make online interactions feel real, building a sense of belonging that lasts beyond the screen.
      </Typography>
      <Box mt={4} />

      <Typography variant="h5" gutterBottom>
        Mission Statement
      </Typography>
      <Typography variant="body1" gutterBottom>
        At{' '}
        <Typography component="span" sx={{ fontWeight: 'bold' }}>
          SoMe
        </Typography>
        , we believe that connection should be simple, safe, and enriching. Our mission is to foster a digital environment where users can be their authentic selves, explore their interests, and connect with like-minded individuals. SoMe was built on the values of creativity, community, and connection, aiming to bridge the gap between online interactions and real-world friendships.
      </Typography>
      <Box mt={4} />

      <Typography variant="h5" gutterBottom>
        Why Choose Us?
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Authenticity at Heart: Designed to combat the superficial, our platform encourages users to express their true selves and celebrate authenticity.
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Safe and Inclusive: Your safety and comfort are our priority.{' '}
        <Typography component="span" sx={{ fontWeight: 'bold' }}>
        SoMe
        </Typography>
        {' '}offers advanced privacy tools and a welcoming space for all.
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Curated Communities: Find your tribe with communities curated around your unique interests, hobbies, and passions.
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Content with Depth: Move beyond the surface and engage with meaningful, thoughtful content that inspires.
      </Typography>
      <Box mt={4} />

      <Typography variant="h5" gutterBottom>
        How to Use SoMe
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Connect: Build and nurture your social network by connecting with friends, family, and like-minded users.
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Share: Post updates, stories, and images that represent who you are, your adventures, and your insights.
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Join Communities: Discover and engage with vibrant communities that match your interests—whether it’s for career development, hobbies, or social causes.
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Discover: Explore trending content, inspiring creators, and exclusive events happening across the platform.
      </Typography>
      <Box mt={4} />

      <Typography variant="h5" gutterBottom>
        Future Plans
      </Typography>
      <Typography variant="body1" gutterBottom>
        We’re just getting started!{' '}
        <Typography component="span" sx={{ fontWeight: 'bold' }}>
          SoMe
        </Typography>
        {' '}is committed to continuous development, with plans to add new features and broaden accessibility. In the near future, we’re focusing on:
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Mobile App Version: SoMe on-the-go, bringing the platform’s full functionality to mobile users.
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Advanced Search and Filtering: Enhanced search tools to make finding content even easier.
      </Typography>
      <Typography variant="body1" gutterBottom>
        • Story Features: Temporary stories that disappear after 24 hours, letting users share moments in real-time.
      </Typography>
      <Box mt={4} />

      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        We’d love to hear from you! Reach out to us or drop by our Tampere office for any inquiries, support, or partnerships.
      </Typography>
      <Box mt={4} />

      <Typography variant="h5" gutterBottom>
        Main Office
      </Typography>
      <Typography variant="body1" gutterBottom>
        SoMe Solutions Ltd.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Finlaysoninkuja 9, 33100 Tampere, Finland
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone: +358 (0)45 123 4567
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: <a href="mailto:info@someapp.fi">info@someapp.fi</a>
      </Typography>
      <Box mt={4} />

      <Typography variant="h5" gutterBottom>
        Customer Support
      </Typography>
      <Typography variant="body1" gutterBottom>
        For support or feedback, contact us:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone: +358 (0)45 987 6543
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: <a href="mailto:support@someapp.fi">support@someapp.fi</a>
      </Typography>
      <Box mt={4} />

      <Typography variant="h5" gutterBottom>
        Office Hours
      </Typography>
      <Typography variant="body1" gutterBottom>
        Monday – Friday: 9:00 AM – 5:00 PM
      </Typography>
      <Typography variant="body1" gutterBottom>
        Follow Us on Social Media
      </Typography>
      <Typography variant="body1" gutterBottom>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> | <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </Typography>
      <Box mt={4} />
    </Container>
  );
}