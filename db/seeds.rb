# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

owners = Owner.create([{ :name => 'Ben'}, {:name => "Ian"}])
lists = List.create([{ :name => "Hello", :owner_id => 1 }, { :name => "Goodbye", :owner_id => 2 }])
tasks = Task.create([{:description => "Task 1", :status => "true", :list_id => 1}])