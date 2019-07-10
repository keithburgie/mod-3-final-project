class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :user
  #belongs_to :conversation
  belongs_to :user
end
