class SearchController < ApplicationController
  def index
    keyword = params[:q]
    # result = Elasticsearch::Model.search(
    #     keyword.to_s, [Article, Disease, Medicine, Post, Tag], {size: 100}
    # )
    article = Article.search(keyword.to_s).limit(5).records
    disease = Disease.search(keyword.to_s).limit(5).records
    medicine = Medicine.search(keyword.to_s).limit(5).records
    post = Post.search(keyword.to_s).limit(5).records
    tag = Tag.search(keyword.to_s).limit(5).records
    doctor = Doctor.search(keyword.to_s).limit(5).records
    render json: {
        article: article,
        disease: disease,
        medicine: medicine,
        post: post,
        tag: tag,
        doctor: doctor
    }
  end
end
