require 'rails_helper'
RSpec.describe BlogsController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Blog. As you add validations to Blog, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {{ title: "New Title", content: "<p>blog body</p>"}}

  let(:invalid_attributes) {
    { title: "", content: "<p>blog body</p>"}
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # BlogsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  before :each do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    @current_user = FactoryGirl.create(:user)
    @auth_headers = @current_user.create_new_auth_token
    request.cookies['auth_headers'] = @auth_headers.to_json
  end

  describe "GET #index" do
    it "assigns all blogs as @blogs" do
      blogs = @current_user.blogs.order("created_at desc")
      get :index, {}
      expect(response.body).to eq(blogs.to_json)
    end
  end

  describe "GET #show" do
    it "assigns the requested blog as @blog" do
      blog = @current_user.blogs.first
      get :show,  id: blog.to_param
      expect(response.body).to eq(blog.to_json)
    end
  end



  describe "POST #create" do
    context "with valid params" do
      it "creates a new Blog" do
        expect {
          post :create, blog: valid_attributes
        }.to change(Blog, :count).by(1)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved blog as @blog" do
        post :create, blog: invalid_attributes
        expect(response.status).to eq(422)
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        {content: "New Attribute"}
      }

      it "updates the requested blog" do
        blog = @current_user.blogs.first
        put :update, id: blog.to_param, blog: new_attributes
        blog.reload
        expect(response.body).to eq(blog.to_json)
      end
    end

    context "with invalid params" do
      it "assigns the blog as @blog" do
        blog = @current_user.blogs.first
        put :update,  id: blog.to_param, blog: invalid_attributes
        expect(response.status).to eq(422)
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested blog" do
      blog = @current_user.blogs.first
      expect {
        delete :destroy, id: blog.to_param
      }.to change(Blog, :count).by(-1)
    end
  end

end
