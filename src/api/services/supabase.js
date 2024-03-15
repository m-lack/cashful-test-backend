const { createClient } = require("@supabase/supabase-js");
let { SUPABASE_URL, SUPABASE_KEY } = process.env;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Auth
const auth = {
  createUser: async (credentials) => {
    let { display_name, email, password } = credentials;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name },
      },
    });
    if (!error) {
      return { user: data.user, error: null };
    }
    return { user: null, error };
  },
  SigninWithPassword: async (credentials) => {
    let { email, password } = credentials;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      return { token: data.session.access_token, error: null };
    }
    return { token: null, error };
  },
  verifyEmail: async (tokenHash) => {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "email",
    });
    if (!error) {
      return { user: data.user, error: null };
    }
    return { user: null, error };
  },
  getUser: async (jwt) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(jwt);

    if (!error) {
      return { user, error: null };
    }
    return { user: null, error };
  },
};

// Database
const db = {
  fetch: async (tableName, query) => {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq(query.name, query.value);

    if (!error) {
      return { data, error: null };
    }
    return { data: null, error };
  },
  insert: async (tableName, data) => {
    const { error } = await supabase.from(tableName).insert(data);

    return { error };
  },
  update: async (tableName, updatedData, query) => {
    const { error } = await supabase
      .from(tableName)
      .update(updatedData)
      .eq(query.name, query.value);

    return { error };
  },
  delete: async (tableName, query) => {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq(query.name, query.value);
    return { error };
  },
};

module.exports = { auth, db };
