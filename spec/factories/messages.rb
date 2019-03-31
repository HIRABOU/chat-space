FactoryBot.define do
  factory :message do
    message {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/sample.jpg")}
    user
    group
  end
end
