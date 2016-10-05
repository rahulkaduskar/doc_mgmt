class BlogsController < ApplicationController
  before_action :set_blog, only: [:show, :edit, :update, :destroy]

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render json:{ error: "Blog not found"}, status: :not_found
  end
  # GET /blogs
  def index
    @blogs = Blog.where({user_id: current_user.id}).order("created_at desc").all
    render json: @blogs, status: :ok 
  end

  # GET /blogs/1
  def show
    if @blog.present?
      render json: @blog, status: :ok 
    else
      render json:{error: " Blog not found"}, status: :not_found
    end
  end

  # GET /blogs/new
  def new
    @blog = Blog.new
  end

  # GET /blogs/1/edit
  def edit
  end

  # POST /blogs
  def create
    @blog = current_user.blogs.build(blog_params)
    if @blog.save
      render json: @blog, status: :created
    else
       render json: @blog.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /blogs/1
  def update
    if @blog.update(blog_params)
      render json: @blog, status: :ok 
    else
       render json: @blog.errors, status: :unprocessable_entity
    end
  end

  # DELETE /blogs/1
  def destroy
    @blog.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def blog_params
      params.require(:blog).permit(:title, :content, :user_id)
    end
end
