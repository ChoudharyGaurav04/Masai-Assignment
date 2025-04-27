const deleteUser = async (key) => {
    try {
      const response = await fetch(`https://your-project-id.firebaseio.com/users/${key}.json`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
  
      console.log('User deleted successfully');
      // Refresh the user list after deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  