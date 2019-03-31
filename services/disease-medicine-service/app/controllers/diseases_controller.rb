class DiseasesController < ApplicationController

  def show
    disease = Disease.friendly.find(params[:id])
    disease.view_count = disease.view_count + 1
    disease.save
    render json: disease
  end

  def index
    @diseases = Disease.exclude_content.name_asc.group_by do |item|
      item.name.parameterize.upcase[0]
    end
    @diseases = @diseases.to_a
    @diseases.sort_by! {|m| m[0]}
    render json: @diseases
  end

  def most_viewed
    diseases = Disease.view_count_desc.limit(10)
    render json: diseases
  end

  def total
    render json: {total: Disease.count}
  end
end
