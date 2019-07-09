class RenameMessageToContent < ActiveRecord::Migration[5.2]
  def change
    rename_column :messages, :message, :content
  end
end
