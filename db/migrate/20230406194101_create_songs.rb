class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :embedded_code

      t.timestamps
    end
  end
end
