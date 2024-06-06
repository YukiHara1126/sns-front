import { useRouter } from "next/router";
import Image from "next/image";
import { GetServerSideProps } from "next";
import apiClient from "@/lib/apiClient";
import { PostType, ProfileType, UserType } from "@/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.query;
  const user = await apiClient.get(`/users/profile/${userId}`);
  const postResponse = await apiClient.get(`/posts/${userId}`);
  return { props: { profile: user.data, posts: postResponse.data } };
};

type Props = {
  profile: UserType;
  posts: PostType[];
};

const UserProfile = ({ profile, posts }: Props) => {
  const router = useRouter();
  const { userId } = router.query;
  console.log(userId, profile, posts);
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <div className="flex items-center">
              <Image
                className="w-20 h-20 rounded-full mr-4"
                alt="User Avatar"
                src={profile.user.profileImageUrl}
                width={100}
                height={100}
              />
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  {profile.username}
                </h2>
                <p className="text-gray-600">{profile.user.bio}</p>
              </div>
            </div>
          </div>
          {posts.posts.map((post) => (
            <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Image
                    className="w-10 h-10 rounded-full mr-2"
                    alt="User Avatar"
                    src={profile.user.profileImageUrl}
                    width={100}
                    height={100}
                  />
                  <div>
                    <h2 className="font-semibold text-md">
                      {post.auther.username}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {post.createdAt.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      ;
    </div>
  );
};

export default UserProfile;
