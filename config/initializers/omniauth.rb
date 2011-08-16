require "~/Dropbox/tascit/config.rb"

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, ENV['TWITTER_CONSUMER_KEY'] ||Config::TWITTER[:consumer_key], ENV['TWITTER_CONSUMER_SECRET'] ||Config::TWITTER[:consumer_secret]
end