class ChangeConversationParticipantsToUsers < ActiveRecord::Migration[5.2]
  def change
    rename_column :conversations, :participants, :users
  end
end
