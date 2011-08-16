class AddUidAndProviderToOwner < ActiveRecord::Migration
  def self.up
    add_column :owners, :uid, :string
    add_column :owners, :provider, :string
  end

  def self.down
    remove_column :owners, :provider
    remove_column :owners, :uid
  end
end
