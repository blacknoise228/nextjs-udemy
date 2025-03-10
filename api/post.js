import { supabase } from "./api";

export async function addPost(postData) {
  const { data, error } = await supabase.from("posts").insert({
    post_text: postData.body,
    author: postData.author,
  });

  if (error) {
    console.error("Ошибка при добавлении поста:", error.message);
    return null;
  }

  return data;
}

export async function getPosts() {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error("Ошибка при получении постов:", error.message);
    return [];
  }

  return data;
}

export async function getPostDetails(id) {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id);

  if (error) {
    console.error("Ошибка при получении поста:", error.message);
    return null;
  }
  console.log(data);
  return data[0];
}
