class SearchController < ApplicationController
  def index
    keyword = params[:q]
    # result = Elasticsearch::Model.search(
    #     keyword.to_s, [Article, Disease, Medicine, Post, Tag], {size: 100}
    # )
    article = Article.search(keyword.to_s).limit(5)
    disease = Disease.search(keyword.to_s).limit(5)
    medicine = Medicine.search(keyword.to_s).limit(5)
    post = Post.search(keyword.to_s).limit(5)
    tag = Tag.search(keyword.to_s).limit(5)
    doctor = Doctor.search(keyword.to_s).limit(5)
    render json: {
        total: {
            article: article.results.total,
            disease: disease.results.total,
            medicine: medicine.results.total,
            post: post.results.total,
            tag: tag.results.total,
            doctor: doctor.results.total
        },
        article: article.records,
        disease: disease.records,
        medicine: medicine.records,
        post: post.records,
        tag: tag.records,
        doctor: doctor.records
    }
  end

  def article
    keyword = params[:q]
    page = params[:page] || 1
    per_page = params[:per_page] || 5
    articles = Article.search(keyword.to_s).page(page).per(per_page)
    total = articles.results.total
    has_more = total > (@page.to_i * @item_per_page.to_i)
    render json: {
        total: articles.results.total,
        results: articles.records,
        has_more: has_more
    }
  end

  def disease
    keyword = params[:q]
    page = params[:page] || 1
    per_page = params[:per_page] || 5
    diseases = Disease.search(keyword.to_s).page(page).per(per_page)
    total = articles.results.total
    has_more = total > (@page.to_i * @item_per_page.to_i)
    render json: {
        total: diseases.results.total,
        results: diseases.records,
        has_more: has_more
    }
  end

  def medicine
    keyword = params[:q]
    page = params[:page] || 1
    per_page = params[:per_page] || 5
    medicines = Medicine.search(keyword.to_s).page(page).per(per_page)
    total = articles.results.total
    has_more = total > (@page.to_i * @item_per_page.to_i)
    render json: {
        total: medicines.results.total,
        results: medicines.records,
        has_more: has_more
    }
  end
end
