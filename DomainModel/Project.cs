using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomainModel;

public partial class Project
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateOnly DeadLine { get; set; }

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
