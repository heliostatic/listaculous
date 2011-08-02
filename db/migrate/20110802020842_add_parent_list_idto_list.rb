  class AddParentListIdtoList < ActiveRecord::Migration
  def self.up
    add_column :lists, :parentlist_id, :integer
    add_column :lists, :status, :integer
    add_column :lists, :description, :text
  end

  def self.down
    remove_column :lists, :description
    remove_column :lists, :status
    remove_column :lists, :parentlist_id
  end
end
