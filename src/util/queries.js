async function deleteApplicationFromDatabase(id, supabaseClient) {
  console.log('is this firing')
  return supabaseClient
    .from('applications')
    .delete({ count: 'estimated' })
    .eq('id', id);
}

async function addApplicationToDatabase(app, supabaseClient) {
  return supabaseClient
    .from('applications')
    .insert(app).select()
}

export { deleteApplicationFromDatabase, addApplicationToDatabase };