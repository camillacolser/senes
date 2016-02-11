class AddTimezoneToIdentity < ActiveRecord::Migration
  def change
    add_column :identities, :timezone, :string
  end
end
