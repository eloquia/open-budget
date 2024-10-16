// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

enum AccountTypeEnum {
  CHECKING = "checking",
  SAVINGS = "savings",
  CREDIT_CARD = "credit card",
  INVESTMENT = "investment",
  LOAN = "loan",
  CASH = "cash",
  CRYPTOCURRENCY = "cryptocurrency",
  RETIREMENT = "retirement",
  OTHER = "other",
}

interface CreateAccountRequest {
  accountName: string
  initialBalance: number
  accountType: AccountTypeEnum
}

async function getAccount(supabaseClient: SupabaseClient, id: string) {
  const { data: account, error } = await supabaseClient.from('accounts').select('*').eq('id', id)
  if (error) throw error

  return new Response(JSON.stringify({ account }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function getAllAccounts(supabaseClient: SupabaseClient) {
  const { data: accounts, error } = await supabaseClient.from('accounts').select('*')
  if (error) throw error

  return new Response(JSON.stringify({ accounts }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

async function createAccout(supabaseClient: SupabaseClient, account: CreateAccountRequest) {
  const { error } = await supabaseClient.from('accounts').insert(account)
  if (error) throw error

  return new Response(JSON.stringify({ account }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

Deno.serve(async (req) => {
  const { url, method } = req

  // This is needed if you're planning to invoke your function from a browser.
  if (method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // For more details on URLPattern, check https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
    const taskPattern = new URLPattern({ pathname: '/accounts/:id' })
    const matchingPath = taskPattern.exec(url)
    const id = matchingPath ? matchingPath.pathname.groups.id : null

    let account = null
    if (method === 'POST' || method === 'PUT') {
      const body = await req.json()
      account = body.task
    }

    // call relevant method based on method and id
    switch (true) {
      case id && method === 'GET':
        return getAccount(supabaseClient, id as string)
      // case id && method === 'PUT':
      //   return updateTask(supabaseClient, id as string, account)
      // case id && method === 'DELETE':
      //   return deleteTask(supabaseClient, id as string)
      case method === 'POST':
        return createAccout(supabaseClient, account)
      case method === 'GET':
        return getAllAccounts(supabaseClient)
      default:
        return getAllAccounts(supabaseClient)
    }
  } catch (error) {
    console.error(error)

    // return new Response(JSON.stringify({ error: error.message }), {
    return new Response(JSON.stringify({ error }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/accounts' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
