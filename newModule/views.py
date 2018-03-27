from django.shortcuts import get_object_or_404, render
from .models import Users


def mainIndex(request):
    return render(request, 'index.html')


def index(request):
    users_list = Users.objects.all()
    context = {'users_list': users_list}
    return render(request, 'list/show.html', context)


def detail(request, user_id):
    user = get_object_or_404(Users, pk=user_id)
    return render(request, 'list/details.html', {'user': user})

