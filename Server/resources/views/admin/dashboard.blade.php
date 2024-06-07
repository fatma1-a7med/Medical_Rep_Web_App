<h2>Admin Dashboard</h2>

<!-- Logout Button -->
<form method="POST" action="{{ route('admin.logout') }}">
    @csrf
    <button type="submit">Logout</button>
</form>
