# Backend

## API Endpoints

All endpoints use base URL: `http://localhost:5000/api`

### Authentication

#### Login

- **POST** `/auth/login`
- Body: `{ username: string, password: string }`

#### Register

- **POST** `/auth/register`
- Body: `{ username: string, password: string }`

### Posts

> Requires authentication via cookies

#### Create Post

- **POST** `/posts/newPost`
- Body:
  - `content`: string (max 300 chars)
  - `visibility`: "public" | "private"
  - `userId`: string
  - `image`: File (optional)

#### Get Posts

- **GET** `/posts/` - Get all posts
- **GET** `/posts/:postId` - Get single post

#### Manage Posts

- **PUT** `/posts/:postId` - Update post
- **DELETE** `/posts/:postId` - Delete post

### Comments

> Requires authentication via cookies

#### Post Comments

- **POST** `/posts/:postId/comments`
- Body: `{ content: string }`

#### Manage Comments

- **PUT** `/posts/:postId/comments/:commentId`
- **DELETE** `/posts/:postId/comments/:commentId`

### Friends

> Requires authentication via cookies

- **GET** `/friends` - Get friends list
- **POST** `/friends/request/:userId` - Send friend request
- **PUT** `/friends/accept/:userId` - Accept friend request
- **DELETE** `/friends/:userId` - Remove friend

### User Profile

> Requires authentication via cookies

- **GET** `/profile/:userId` - Get user profile
- **PUT** `/profile` - Update profile

### Messages

> Requires authentication via cookies

- **GET** `/messages/:userId` - Get chat history
- **POST** `/messages` - Send message
