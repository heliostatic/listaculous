source 'http://rubygems.org'

gem 'rails', '3.2.11'
gem 'acts_as_list', :git => 'https://github.com/swanandp/acts_as_list.git'
gem 'omniauth'
gem 'omniauth-twitter'
gem "jquery-rails"
gem "sass"

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails'
  gem 'coffee-rails'
  gem 'uglifier', '>= 1.0.3'
end

group :production do
	gem "pg"
end
group :development, :test do
  gem "sqlite3-ruby", :require => 'sqlite3'
  gem 'heroku'
end

