// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
};

async function getCategory(supabaseClient: SupabaseClient, id: string) {
  const { data: task, error } = await supabaseClient.from("categories").select(
    "*",
  ).eq("id", id);
  if (error) throw error;

  return new Response(JSON.stringify({ task }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

async function getAllCategories(supabaseClient: SupabaseClient) {
  const { data: categories, error } = await supabaseClient.from("categories")
    .select("*");
  if (error) throw error;

  return new Response(JSON.stringify({ categories }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

async function deleteCategory(supabaseClient: SupabaseClient, id: string) {
  const { error } = await supabaseClient.from("categories").delete().eq(
    "id",
    id,
  );
  if (error) throw error;

  return new Response(JSON.stringify({}), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

async function updateCategory(
  supabaseClient: SupabaseClient,
  id: string,
  category: Category,
) {
  const { error } = await supabaseClient.from("categories").update(category).eq(
    "id",
    id,
  );
  if (error) throw error;

  return new Response(JSON.stringify({ category }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

async function createCategory(
  supabaseClient: SupabaseClient,
  category: Category,
) {
  const { error } = await supabaseClient.from("categories").insert(category);
  if (error) throw error;

  return new Response(JSON.stringify({ category }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
}

Deno.serve(async (req) => {
  const { url, method } = req;

  // This is needed if you're planning to invoke your function from a browser.
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // For more details on URLPattern, check https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
    const taskPattern = new URLPattern({ pathname: "/categories/:id" });
    const matchingPath = taskPattern.exec(url);
    const id = matchingPath ? matchingPath.pathname.groups.id : null;

    let task = null;
    if (method === "POST" || method === "PUT") {
      const body = await req.json();
      task = body.task;
    }

    // call relevant method based on method and id
    switch (true) {
      case id && method === "GET":
        return getTask(supabaseClient, id as string);
      case id && method === "PUT":
        return updateTask(supabaseClient, id as string, task);
      case id && method === "DELETE":
        return deleteTask(supabaseClient, id as string);
      case method === "POST":
        return createTask(supabaseClient, task);
      case method === "GET":
        return getAllTasks(supabaseClient);
      default:
        return getAllTasks(supabaseClient);
    }
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/categories' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
