class DropTaskModel < ActiveRecord::Migration
  def self.up
    drop_table :tasks
  end

  def self.down
    create_table :tasks do |t|
      t.text :description
      t.text :status
      t.integer :list_id

      t.timestamps
    end
  end
end
