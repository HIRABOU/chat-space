if @new_messages.present?
  json.array! @new_messages.each do |message|
    json.text message.message
    json.image message.image.url
    json.user_name message.user.name
    json.id message.id
    json.time message.created_at.strftime("%Y/%m/%d %H:%M")
  end
end
