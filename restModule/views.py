from django.shortcuts import get_object_or_404, render, redirect
from .models import Users
from .forms import UserForm


def main_index(request):
    return render(request, 'index.html')


def index(request):
    users_list = Users.objects.all()
    context = {'users_list': users_list}
    return render(request, 'list/show.html', context)


def detail(request, user_id):
    user = get_object_or_404(Users, pk=user_id)
    return render(request, 'list/details.html', {'user': user})


def create(request):
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('/list/' + str(user.pk))
    else:
        form = UserForm()
        return render(request, 'list/create.html', {'form': form})


def edit(request, user_id):
    user = get_object_or_404(Users, pk=user_id)
    if request.method == "POST":
        form = UserForm(request.POST, instance=user)
        if form.is_valid():
            user = form.save()
            return redirect('/list/' + str(user.pk))
    else:
        form = UserForm(instance=user)
        return render(request, 'list/edit.html', {'form': form, 'user_id': user.pk})


def delete(request, user_id):
    user = get_object_or_404(Users, pk=user_id)
    user.delete()
    return redirect('/list/')

