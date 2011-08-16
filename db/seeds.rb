# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

owners = Owner.create([{ :name => 'Ben', :id => 1, :uid => 4656441, :provider => "twitter"}])
lists = List.create([{ :name => "First", :id => 1, :owner_id => 1, :parentlist_id => nil}, { :name => "Goodbye", :owner_id => 1, :parentlist_id => nil }])
tasks = List.create([{:name => "One", :status => "1", :parentlist_id => 1, :position => 1}, 
                      {:name => "Two", :status => "0", :parentlist_id => 1, :position => 2}, 
                      {:name => "Three", :status => "1", :parentlist_id => 1, :position => 3}, 
                      {:name => "Four", :status => "0", :parentlist_id => 1, :position => 4}])