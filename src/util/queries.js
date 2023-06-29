async function deleteApplicationFromDatabase(id, supabaseClient) {
  return supabaseClient
    .from('applications')
    .delete({ count: 'estimated' })
    .eq('id', id);
}

async function addApplicationToDatabase(app, supabaseClient) {
  return supabaseClient
    .from('applications')
    .insert(app)
    .select()
}

async function editApplicationInDatabase(app, id, supabaseClient) {
  return supabaseClient
    .from('applications')
    .update(app)
    .eq('id', id)
    .select()
}


export { deleteApplicationFromDatabase, addApplicationToDatabase, editApplicationInDatabase };