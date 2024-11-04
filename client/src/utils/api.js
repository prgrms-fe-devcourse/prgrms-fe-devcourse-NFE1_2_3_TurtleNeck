// api.js
const BASE_URL = 'http://localhost:3005';

export const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '요청 처리 중 오류가 발생했습니다');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
export const fetchApimulti = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '요청 처리 중 오류가 발생했습니다');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// 로그인
export const authApi = {
  login: async (id, password) => {
    return fetchApi('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ id, password }),
    });
  },
};

//카테고리 리스트
export const categoryApi = {
  getCategories: async () => {
    return fetchApi('/api/category', {
      method: 'GET',
    });
  },
};

export const postApi = {
  // 최신 게시글 조회
  getRecentPosts: async (limit = 2) => {
    // 서버에 limit 개수만큼의 최신 게시글 요청
    // 예: /api/post?limit=2 는 2개의 게시글 요청
    return fetchApi(`/api/post?limit=${limit}`);
  },

  // 모든 게시글 조회
  getAllPosts: async () => {
    return fetchApi('/api/post');
  },

  // 새 게시글 작성
  createPost: async ({ categoryId, title, tags, content, mainImage }) => {
    const formData = new FormData();
    formData.append('categoryId', categoryId);
    formData.append('title', title);
    tags.forEach((tag) => formData.append('tags', tag));
    formData.append('content', content);
    formData.append('file', mainImage);
    if (mainImage) {
      formData.append('mainImage', mainImage);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    return fetchApimulti('/api/post', {
      method: 'POST',
      body: formData, // FormData 사용
    });
  },

  // 특정 게시글 조회
  getPost: async (postId) => {
    return fetchApi(`/api/post/${postId}`);
  },

  // 게시글 수정
  updatePost: async (postId, updateData) => {
    return fetchApi(`/api/post/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
  },

  // 게시글 삭제
  deletePost: async (postId) => {
    return fetchApi(`/api/post/${postId}`, {
      method: 'DELETE',
    });
  },
};
