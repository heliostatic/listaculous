class AddDurationToList < ActiveRecord::Migration
  def self.up
    add_column :lists, :duration, :integer
  end

  def self.down
    remove_column :lists, :duration
  end
end
