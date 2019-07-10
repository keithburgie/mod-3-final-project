class RemoveUsersFromConversations < ActiveRecord::Migration[5.2]
  def change
    remove_column :conversations, :users
  end
end
