from django.shortcuts import get_object_or_404, render, redirect
from .models import Users
from .forms import UserForm


def mainIndex(request):
    return render(request, 'index.html')


def index(request):
    users_list = Users.objects.all()
    context = {'users_list': users_list}
    return render(request, 'list/show.html', context)


def detail(request, user_id):
    print('detail')
    print(user_id)
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
    print(request.method)
    user = get_object_or_404(Users, pk=user_id)
    if request.method == "PATCH":
        user = UserForm(request.PATCH, instance=user)
        if user.is_valid():
            user.save()
            return redirect('/list/' + str(user.pk))
    else:
        user = UserForm(instance=user)
        return render(request, 'list/edit.html', {'form': user})

