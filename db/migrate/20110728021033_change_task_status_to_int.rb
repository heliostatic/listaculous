class ChangeTaskStatusToInt < ActiveRecord::Migration
  def self.up
    change_column :tasks, :status, :integer
  end

  def self.down
    change_column :tasks, :status, :text
  end
end
