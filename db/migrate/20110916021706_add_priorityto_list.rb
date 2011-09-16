class AddPrioritytoList < ActiveRecord::Migration
  def self.up
    add_column :lists, :priority, :integer
  end

  def self.down
    remove_column :lists, :priority
  end
end
