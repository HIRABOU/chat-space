# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # storage :file
  # def store_dir
  #   "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  # end

    process resize_to_fit: [150, 150]
end
