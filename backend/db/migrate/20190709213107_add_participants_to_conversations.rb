class AddParticipantsToConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :conversations, :participants, :string, array: true, default: []
  end
end
